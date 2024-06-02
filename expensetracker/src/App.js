import {useEffect, useState} from"react"
import './App.css'; 
import AddBalanceExpenseModal from "./Components/AddBalanceExpensesModal";
import { MdOutlineFastfood,  MdMovieFilter  , MdFlight  ,  MdDeleteForever ,MdEdit  } from "react-icons/md";
import { HiArrowSmLeft  ,HiArrowSmRight } from "react-icons/hi";
import  PieChartComponent from "./Components/AddPieChart";
import HorizontalBarChart from "./Components/HorizontalBarChart"


function App() {
  const savedExpense = JSON.parse(localStorage.getItem('expense-tracker'));
  const savedWalletBalance = JSON.parse(localStorage.getItem('expense-walletbalance'));
  const savedTotalExpense = JSON.parse(localStorage.getItem('expense-totalexpenses'));
  const[walletBalance , setWalletBalance] = useState(savedWalletBalance || 5000);
  const[totalExpenses , setTotalExpenses] = useState(savedTotalExpense || 500);
  
  const[expensesList , setExpensesList] = useState(savedExpense ? savedExpense : [
    {
      id : 1,
      category : "Food",
      title : "Samosa" ,
      date : "2024-03-01",
      price : 150
  
    },
    {
      id : 2,
    category : "Entertainment",
    title : "Movie" ,
    date : "2023-05-01",
    price : 300
  },
  { 
    id : 3,
    category : "Travel",
    title : "Auto" ,
    date : "2024-05-11",
    price : 50
  }
])

const [isOpen , setIsOpen] = useState(false);
const[modalType  , setModalType] = useState("");
const[edititem , setEditItem] = useState({});
const[paginationvalue , setPaginationValue] = useState(1);
  const[pagedata , setPageData]= useState([]);

  console.log(expensesList);


  const nextPage = () => {
    setPaginationValue(paginationvalue + 1);
  };

  const prevPage = () => {
    setPaginationValue(paginationvalue - 1);
  };


  useEffect(()=>{

    const indexOfLastData = paginationvalue * 3;
    const indexOfFirstData = indexOfLastData - 3;
    const currentData =  expensesList.slice(indexOfFirstData, indexOfLastData);
    setPageData(currentData);
    localStorage.setItem("expense-tracker" , JSON.stringify(expensesList));
    localStorage.setItem("expense-walletbalance" , JSON.stringify(walletBalance));
    localStorage.setItem("expense-totalexpenses" , JSON.stringify(totalExpenses))


  },[paginationvalue, expensesList])

const openModal = (e , item) => {
  setIsOpen(true);

  if(e.target.textContent.includes("Add Income")){
    setModalType("Add Income")
  }

  else if(e.target.textContent.includes("Add Expense")){
    setModalType("Add Expense")
  }

  else{
    setModalType("Edit Expense");
    // console.log(item)
    setEditItem(item)
  }

};

console.log(modalType)
// console.log(edititem)

const closeModal = () => {
  setIsOpen(false);
};

const handleDelete =(deleteid) =>{
  
  let deletenewList = expensesList.filter((item) => item.id !== deleteid)
  setExpensesList(deletenewList);
}


const handleSubmit = (formData) => {
  AddEditWalletBalance(formData , modalType)
  
};

const AddEditWalletBalance = (formData, modalType) =>{

  if(modalType === "Add Income"){
    setWalletBalance(walletBalance + parseInt(formData.addbalance));
    closeModal();
  }
  

  if(modalType === "Add Expense" ){
    setExpensesList([...expensesList , formData])

    setWalletBalance(walletBalance - formData.price);
    setTotalExpenses(totalExpenses + formData.price)
    closeModal();

  }

  if(modalType === "Edit Expense"){
    let neweditedList = expensesList.map(item => {

      if (item.id !== formData.id) return item;

      if(item.price < formData.price){
        setWalletBalance(walletBalance - (formData.price -item.price));
        setTotalExpenses(totalExpenses + (formData.price -item.price));

      }
      else{
        setWalletBalance(walletBalance + (item.price -formData.price));
        setTotalExpenses(totalExpenses - (item.price -formData.price));
      }
      return  formData ;
    });
 

    // console.log(neweditedList);
    setExpensesList(neweditedList)

    closeModal();
  }
  
  
}

function formatDate(dateString) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}




  return (
    <div className="App">
      <h2 className ="expense-header"> Expense Tracker</h2>
      <div className="tracker">
         <div className="walletbalance">
            <h3 className="wbheader">Wallet Balance: <span className="wbalance">₹{walletBalance}</span></h3>
            <button onClick={openModal} className="addincome-btn">+ Add Income</button>
         </div>
         <div className="expenses">
            <h3 className="wbheader">Expenses: <span className="expenseamount">₹{totalExpenses}</span></h3>
            <button onClick={openModal} className="addexpense-btn">+ Add Expense</button>
         </div>
         <div className="piechart">
          <PieChartComponent  expenselist={expensesList}/>
         </div>

         {isOpen  &&<AddBalanceExpenseModal 
         isOpen={isOpen}
         closeModal={closeModal}
         handleSubmit={handleSubmit}
         modalType = {modalType}
         walletBalance ={walletBalance}
         totalExpenses = {totalExpenses}
         edititem={edititem}
         />}

      </div>

    <div className="transexpense">
      <div className="recenttransaction">
        <h2 className="recenttransheader">Recent Transactions</h2>
        <div className="recenttransactiontable">
          
          <table className="table">
            <tbody>
              {pagedata.map((item)=>{
                return(
                  <>
                  <tr>
                    <div className ="tablerow">
                      <div>
                    <td className="categoty-icon">{item.category ==="Food" ? <MdOutlineFastfood/> : item.category ==="Travel"? <MdFlight/> : < MdMovieFilter />}</td>
                    <td  className="tabletitledate">
                       <div>{item.title}</div>
                       <div className="tabledate">{formatDate(item.date)}</div>
                    </td>
                     </div>
                     <div>
                    <td className="tableprice">₹{item.price}</td>
                    
                    <td><div className="tabledelete" onClick={()=> handleDelete(item.id)}><MdDeleteForever size={25}/> </div></td>
                    <td><div className="tableedit" onClick={ (e)=>openModal(e , item)}><MdEdit size={25}/> </div></td>
                    </div>
                    
                  </div>
                   
                  </tr>
                  <hr></hr>
                  </>
                  
                )
                })}
            </tbody>
          </table>

          <div className="pagination-center">
            <div className ="pagination">
              <button className="pagination-btn" onClick={prevPage} disabled={paginationvalue === 1}>
                <HiArrowSmLeft size={15}/>
              </button>
              <div className="pagination-value" >{paginationvalue}</div>
              <button className="pagination-btn" onClick={nextPage} disabled={paginationvalue * 3 >= expensesList.length}>
                <HiArrowSmRight size={15}/>
              </button>
              </div>
          </div>

        </div>
      </div>

        <div className="topexpenses">
          <h2 className="recenttransheader">Top Expenses</h2>
         <div className="topexpenseschart"> 
         <HorizontalBarChart  expenselist={expensesList}/>
         </div>
        </div>
      </div>
        
    </div>
  );
}

export default App;
 