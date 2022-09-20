public with sharing class FetchBikes {
    @AuraEnabled(cacheable=true)
    public static List<Product__c> fetchRecord(){
        System.debug('ok');
         return [SELECT Id, Name, Level__c, MSRP__c, Battery__c, Charger__c, Motor__c, Material__c, Fork__c, Front_Brakes__c, Rear_Brakes__c, Picture_URL__c FROM Product__c WHERE Name LIKE 'DYNAMO%' LIMIT 2];
    }
}
