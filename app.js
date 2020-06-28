var budgetController = (function(){
    
     var Expense = function(id, description, value){

        this.id= id;
        this. description= description;
        this.value= value;

    };
    var Income = function(id, description, value){

        this.id= id;
        this. description= description;
        this.value= value;

    };

    var data = {

        allItems:{
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    };
    return{

        addItem: function(type, des, val){
            var newItem, ID;
            if(data.allItems[type].length>0)
            {
                ID=data.allItems[type][data.allItems[type].length-1].id+1;
            }
            else
            {
                ID=0;
            }

            if(type === 'exp')
            {
                newItem= new Expense(ID, des, val);
            } else if(type === 'inc')
            {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        }

    };


})();


var UIController = (function(){
    var DomString ={
        inputType: '.add__type',
        inputDesciption :'.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    };

    return{
        getInput: function(){
            return{
                type: document.querySelector(DomString.inputType).value,
                description: document.querySelector(DomString.inputDesciption).value,
                value: document.querySelector(DomString.inputValue).value
            };
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
           if(type === 'inc')
           {
            element= DomString.incomeContainer;
            html= '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
           }
           else if(type === 'exp')
           {
               element=DomString.expensesContainer;
            html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
           }
           newHtml= html.replace('%id%', obj.id);
           newHtml= newHtml.replace('%description%', obj.description);
           newHtml= newHtml.replace('%value%', obj.value);

           document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

           
        },
        clearFields: function(){
          var fields, fieldsArr;
          fields= document.querySelectorAll(DomString.inputDesciption + ',' + DomString.inputValue);

          fieldsArr= Array.prototype.slice.call(fields);

          fieldsArr.forEach(function(current, index, array) {

            current.value="";
              
          });

          fieldsArr[0].focus();
        getDomstring: function(){
            return DomString;
        }
    };
})();


var controller = (function(budgetCtrl, UICtrl){
    
    var setupEventListener= function(){

        var DOM = UICtrl.getDomstring();

        document.querySelector(DOM.inputButton).addEventListener('click', cntrlAddItem);

        document.addEventListener('keypress', function(event){
          if(event.keyCode === 13 || event.which === 13)
          {
             cntrlAddItem();
          }
    });

    };
    

    var cntrlAddItem = function(){
        
      var input, newItem;

      input= UICtrl.getInput();

      newItem=  budgetCtrl.addItem(input.type, input.description, input.value);
        
      UICtrl.addListItem(newItem, input.type);
      
      UICtrl.clearFields();
        
        
        

    };

    return{
        init: function(){

            setupEventListener();
        }
    };

     
})(budgetController, UIController);

controller.init();
