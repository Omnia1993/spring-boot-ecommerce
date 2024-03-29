package com.omnia.ecommerce.config;

import com.omnia.ecommerce.entity.Country;
import com.omnia.ecommerce.entity.Product;
import com.omnia.ecommerce.entity.ProductCategory;
import com.omnia.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;

    @Autowired
    public  MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;

    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        //Disable Http Methods for products:Put,Post And Delete
        disableHttpMethods(Product.class,config, theUnsupportedActions);

        //Disable Http Methods for productCategory:Put,Post And Delete
        disableHttpMethods(ProductCategory.class,config, theUnsupportedActions);

        //Disable Http Methods for Country:Put,Post And Delete
        disableHttpMethods(Country.class,config, theUnsupportedActions);

        //Disable Http Methods for state:Put,Post And Delete
        disableHttpMethods(State.class,config, theUnsupportedActions);



//call an internal helper method
        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //expose entity ids
        //
        //-get a list of all entity classes from the entity manager
        Set<EntityType<?>>entities=entityManager.getMetamodel().getEntities();
        //-creat an array of the entity type
        List<Class> entityClasses = new ArrayList<>();
        //-get the entity types of thr entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());

        }
        //-expose the entity ids for the array of the entity /domain types
        Class []domainTypes=entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}




