package com.lessons.services;

import com.common.utilities.AuditManager;
import com.lessons.models.RegisterUserDTO;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Service
public class RegistrationService {
    private static final Logger logger = LoggerFactory.getLogger(RegistrationService.class);

    @Resource
    private DataSource dataSource;

    @Resource
    private DatabaseService databaseService;

    @Resource
    private UserService userService;



    public void registerUser(RegisterUserDTO aDTO) {

        AuditManager auditManager = new AuditManager(this.dataSource, this.userService.getLoggedInFullName(), databaseService.getMapTableNameToCsvOfColumns());

        String sql = """
                    update users
                    set last_login_date=now(), cert_username=:cert_username, email=:email
                    where id=:id
                    """;

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("cert_username", aDTO.getUsername());
        paramMap.put("email",         aDTO.getEmail());
        paramMap.put("id",            userService.getLoggedInUserId());

        // Execute the SQL to update the USERS record (and add an audit record)
        auditManager.runSqlUpdateOne(sql, paramMap, "users_aud");
    }
}
