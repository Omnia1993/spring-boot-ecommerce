package com.omnia.ecommerce.dao;

import com.omnia.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "Gary",path = "Gary-Products" )
public interface ProductRepository extends JpaRepository<Product,Long>{

}
