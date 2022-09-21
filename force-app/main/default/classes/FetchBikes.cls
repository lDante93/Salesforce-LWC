public with sharing class FetchBikes {
    @AuraEnabled(cacheable=true)
    public static List<Product__c> fetchRecord(String searchValue, Integer sliderValue, List<String> categoryValue, List<String> materialValue, List<String> levelValue){

        String baseQuery= 'SELECT Id, Name, Level__c, MSRP__c, Battery__c, Category__c, Charger__c, Motor__c, Material__c, Fork__c, Front_Brakes__c, Rear_Brakes__c, Picture_URL__c FROM Product__c WHERE ';
        if(searchValue==null){
            searchValue='';
        }
            searchValue='\'%'+searchValue+'%\'';
            baseQuery += ' NAME LIKE '+searchValue;
        if(sliderValue!=null){
            baseQuery += ' AND MSRP__C <= ' +sliderValue;
        }
        if(categoryValue!=null && !categoryValue.isEmpty()){
            baseQuery += ' AND Category__c IN :categoryValue';
        }
        if(materialValue!=null && !materialValue.isEmpty()){
            baseQuery += ' AND Material__c IN :materialValue';
        }
        if(levelValue!=null && !levelValue.isEmpty()){
            baseQuery += ' AND Level__c IN :levelValue';
        }
        System.debug(baseQuery);
        List<Product__c> productList = Database.query(baseQuery);
        return productList;
    }
}
