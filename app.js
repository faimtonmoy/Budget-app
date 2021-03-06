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
    var calculateTotal = function(type){
        var sum= 0;
        data.allItems[type].forEach(function(curr){
          sum+= curr.value;
        });
        data.totals[type]= sum;
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
        budget: 0,
        percentage: -1

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
        },
        deleteItem: function(type, id){
            var ids, index;

            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index= ids.indexOf(id);

            if (index !== -1)
            {
               data.allItems[type].splice(index,1);
            }

        },

        calculateBudget: function()
        {
           calculateTotal('exp');
           calculateTotal('inc');

           data.budget= data.totals.inc- data.totals.exp;
           if(data.totals.inc>0){
            
            data.percentage= Math.round((data.totals.exp/ data.totals.inc)* 100);

           }
           else
           {
               data.percentage= -1;
           }
           
        },
        getBudget: function()
        {
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

    };


})();


var UIController = (function(){
    var DomString ={
        inputType: '.add__type',
        inputDesciption :'.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'

    };

    return{
        getInput: function(){
            return{
                type: document.querySelector(DomString.inputType).value,
                description: document.querySelector(DomString.inputDesciption).value,
                value: parseFloat(document.querySelector(DomString.inputValue).value)
            };
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
           if(type === 'inc')
           {
            element= DomString.incomeContainer;
            html= '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
           }
           else if(type === 'exp')
           {
               element=DomString.expensesContainer;
            html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
           }
           newHtml= html.replace('%id%', obj.id);
           newHtml= newHtml.replace('%description%', obj.description);
           newHtml= newHtml.replace('%value%', obj.value);

           document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

           
        },
        deleteListItem: function(selectorID){

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },
        clearFields: function(){
          var fields, fieldsArr;
          fields= document.querySelectorAll(DomString.inputDesciption + ',' + DomString.inputValue);

          fieldsArr= Array.prototype.slice.call(fields);

          fieldsArr.forEach(function(current, index, array) {

            current.value="";
              
          });

          fieldsArr[0].focus();
        }, 
        displayBudget: function(obj){

            document.querySelector(DomString.budgetLabel).textContent= obj.budget;
            document.querySelector(DomString.incomeLabel).textContent= obj.totalInc;
            document.querySelector(DomString.expensesLabel).textContent= obj.totalExp;
            
            if(obj.percentage>0){

                document.querySelector(DomString.percentageLabel).textContent= obj.percentage + '%';

            }
            else{

                document.querySelector(DomString.percentageLabel).textContent= '---';
            }



        },
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
        document.querySelector(DOM.container).addEventListener('click',cntrlDeleteItem);

    };
    
    var updateBudget = function(){
         
        budgetCtrl.calculateBudget();

        var budget = budgetCtrl.getBudget();
        
        UICtrl.displayBudget(budget);
    };
    

    var cntrlAddItem = function(){
        
      var input, newItem;

      input= UICtrl.getInput();

      if(input.description !== "" && !isNaN(input.value) && input.value>0){
          
        newItem=  budgetCtrl.addItem(input.type, input.description, input.value);
      
        UICtrl.addListItem(newItem, input.type);
  
        UICtrl.clearFields();
  
        updateBudget();
      }
        
        
    };
    var cntrlDeleteItem = function(event){
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){

            splitID= itemID.split('-');
            type= splitID[0];
            ID= parseInt(splitID[1]);

            budgetCtrl.deleteItem(type, ID);
            UICtrl.deleteListItem(itemID);
            updateBudget();
        }
    };

    return{
        init: function(){
            
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1

            });


            setupEventListener();
        }
    };

     
})(budgetController, UIController);

controller.init();
