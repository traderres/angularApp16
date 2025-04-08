package com.lessons.services;

import com.lessons.models.ExceptionRecordDTO;
import jakarta.annotation.Resource;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.List;

@Service
public class ExceptionRecordService {

    @Resource
    private DataSource dataSource;


    // Use the rowMapper to convert the results into a list of ReportDTO objects
    private final BeanPropertyRowMapper<ExceptionRecordDTO> rowMapper = new BeanPropertyRowMapper<>(ExceptionRecordDTO.class);

    public List<ExceptionRecordDTO> getAllExceptions() {
        String sql = """
                    select u.full_name as user_full_name, e.id as id, e.cert_username as user_cert_name, e.app_name,
                           e.app_version, e.url, e.message, e.cause, e.stack_trace,
                           to_char(e.event_date, 'mm/dd/yyyy hh24:mi:ss') as event_date
                    from exceptions e
                    left join users u on (e.user_id = u.id)
                    order by e.id
                    """;

        JdbcTemplate jt = new JdbcTemplate(this.dataSource);

        // Be careful with jt.query()
        // -- If there are setters that are not found, then it fails SILENTLY!!!!
        List<ExceptionRecordDTO> listOfExceptions = jt.query(sql, rowMapper);

        return listOfExceptions;
    }

}
