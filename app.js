var budgetController = (function(){

})();


var UIController = (function(){
    var DomString ={
        inputType: '.add__type',
        inputDesciption :'.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'

    };

    return{
        getInput: function(){
            return{
                type: document.querySelector(DomString.inputType).value,
                description: document.querySelector(DomString.inputDesciption).value,
                value: document.querySelector(DomString.inputValue).value
            };
        },
        getDomstring: function(){
            return DomString;
        }
    };

})();


var controller = (function(budgetCtrl, UICtrl){
    
     var DOM = UICtrl.getDomstring();
    
    var cntrlAddItem= function(){
        
        var input= UICtrl.getInput();
        console.log(input);
    }

    document.querySelector(DOM.inputButton).addEventListener('click', cntrlAddItem);

    document.addEventListener('keypress', function(event){
          if(event.keyCode === 13 || event.which === 13)
          {
             cntrlAddItem();
          }
    });

})(budgetController, UIController);
