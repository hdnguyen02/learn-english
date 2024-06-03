package com.hdnguyen.learnenglish.entity;


import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

import java.util.Date;

@MappedSuperclass
@Data
public class BaseEntity {
    @Column(updatable = false)
    private Date created;

    @Column(updatable = false)
    private String createdBy;

    @Column(insertable = false)
    private Date modified;

    @Column(insertable = false)
    private String modifiedBy;
}
