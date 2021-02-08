package com.omnia.ecommerce.config;

import com.omnia.ecommerce.entity.Product;
import com.omnia.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
    @Override

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        String pathPatternCors = "/**";
        cors.addMapping(pathPatternCors).allowCredentials(false).allowedOrigins("*").exposedHeaders("Authorization", "Content-Type");

        HttpMethod[] theUnsupportedActions={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
        //Disable Http Methods for products:Put,Post And Delete
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

       //Disable Http Methods for productCategory:Put,Post And Delete
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}


