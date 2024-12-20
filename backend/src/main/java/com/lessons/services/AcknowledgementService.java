package com.lessons.services;

import com.common.utilities.AuditManager;
import com.common.utilities.Constants;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Service
public class AcknowledgementService {
    private static final Logger logger = LoggerFactory.getLogger(AcknowledgementService.class);

    @Resource
    private UserService userService;

    @Resource
    private DatabaseService databaseService;

    @Resource
    private DataSource dataSource;


    /**
     * @param aUserid holds the number that identifies this user in the USERS table
     * @return TRUE if the user has acknowledged DOD consent within 24 hours.  Returns FALSE if the user needs to acknowledge the DOD consent
     */
    public boolean hasUserAcknowledgedDodConsentRecently(Integer aUserid) {

        String sql = """
                    select DATE_PART('day', AGE( now() , acknowledgement_date)) as total_days
                    from users
                    where id=?
                    """;

        JdbcTemplate jt = new JdbcTemplate(this.dataSource);

        // Execute the SQL to get the total days since the LAST time the user acknowledged dod consent
        Integer totalDaysSinceAck = jt.queryForObject(sql, Integer.class, aUserid);

        if (totalDaysSinceAck == null) {
            // The user has never acknowledged the DOD consent.  So, return FALSE as the user has not acknowledged DOD consent yet
            return false;
        }

        if (totalDaysSinceAck >= 1) {
            // The user acknowledged consent but it has been 1 or more days since.  So, return FALSE as the user needs to acknowledge DOD consent again
            return false;
        }

        // It has been under 1 day since the user last acknowledged.  So, return TRUE as the user does not need to acknowledge
        return true;
    }



    /**
     * Run a SQL Transaction to set this user's acknowledge_dod_consent_date *AND* to set the session so it holds that the user has acknowledged the DOD consent page
     */
    public void markUserAsAcknowledgeDodConsent() {

        TransactionTemplate tt = new TransactionTemplate();
        tt.setTransactionManager(new DataSourceTransactionManager( this.dataSource ));

        // This transaction will throw a TransactionTimedOutException after 60 seconds (causing the transaction to rollback)
        tt.setTimeout(Constants.SQL_TRANSACTION_TIMEOUT_SECS);

        tt.execute(new TransactionCallbackWithoutResult()
        {
            protected void doInTransactionWithoutResult(TransactionStatus aStatus)
            {
                AuditManager auditManager = new AuditManager(dataSource, userService.getLoggedInUserName() , databaseService.getMapTableNameToCsvOfColumns() );

                String sql = "update users set acknowledgement_date=now() where id=:userid";

                // Build the parameter map
                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("userid", userService.getLoggedInUserId() );

                // Use the auditManager to run the SQL and add an audit record
                auditManager.runSqlUpdateOne(sql, paramMap, "users_aud");

                // Commit the transaction if I get to the end of this method
            }
        });
    }


}
