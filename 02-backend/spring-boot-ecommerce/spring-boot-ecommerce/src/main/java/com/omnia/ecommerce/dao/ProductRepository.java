package com.omnia.ecommerce.dao;

import com.omnia.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "Products",path = "Products" )
public interface ProductRepository extends JpaRepository<Product,Long>{

}
