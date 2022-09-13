public with sharing class FetchContact {

    @AuraEnabled(cacheable=true)
    public static List<Contact> fetchRecords(Integer numberOfRecords){
        System.debug('ok');
         return [SELECT Id, Name, Email FROM Contact LIMIT :numberOfRecords];
    }

    // @AuraEnabled(cacheable=true)
    // public static List<Contact> fetchRecords(){
    //     System.debug('ok');
    //      return [SELECT Id, Name, Email FROM Contact LIMIT 10];
    // }
}
