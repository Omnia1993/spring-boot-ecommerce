package com.omnia.ecommerce.dao;

import com.omnia.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "omnia",path = "product_category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {





}
