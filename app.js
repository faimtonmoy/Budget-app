var budgetController = (function(){

})();


var UIController = (function(){

})();


var controller = (function(budgetCtrl, UIctrl){

    var cntrlAddItem= function(){

    }

    document.querySelector('.add__button').addEventListener('click', cntrlAddItem);

    document.addEventListener('keypress', function(event){
          if(event.keyCode === 13 || event.which === 13)
          {
             cntrlAddItem();
          }
    });

})(budgetController, UIController);