({
    onInit : function (component, event, helper) {

        //Call the getAll Apex method
        var action = component.get('c.getAll');
        //Set boat id as parameter
        action.setParams({
            boatId : component.get('v.boat').Id
        });

        //Handle response
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                //Set boatReviews array with response
                component.set('v.boatReviews', response.getReturnValue());
            }
            else if (state === 'INCOMPLETE') {
            }
            //Handle error
            else if (state === 'ERROR') {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' +
                            errors[0].message);
                    }
                } else {
                    console.log('Unknown error');
                }
            }
        });

        $A.enqueueAction(action);
    },
})