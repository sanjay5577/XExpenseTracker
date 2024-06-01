import {useState} from"react"
import './App.css'; 
import AddBalanceExpenseModal from "./Components/AddBalanceExpensesModal";
import { MdOutlineFastfood,  MdMovieFilter  , MdFlight  ,  MdDeleteForever ,MdEdit  } from "react-icons/md";
import { HiArrowSmLeft  ,HiArrowSmRight } from "react-icons/hi";


function App() {
  const[walletBalance , setWalletBalance] = useState(5000);
  const[totalExpenses , setTotalExpenses] = useState(500);
  const[expensesList , setExpensesList] = useState([
    {
      id : 1,
      categoty : "Food",
      title : "Samosa" ,
      date : "2024-03-01",
      price : 150
  
    },
    {
      id : 2,
    categoty : "Entertainment",
    title : "Movie" ,
    date : "2023-05-01",
    price : 300
  },
  { 
    id : 3,
    categoty : "Travel",
    title : "Auto" ,
    date : "2024-05-11",
    price : 50
  }
])

const [isOpen , setIsOpen] = useState(false);
const[modalType  , setModalType] = useState("");
const[paginationvalue , setPaginationValue] = useState(1);
  const[pagedata , setPageData]= useState([]);

const openModal = (e) => {
  setIsOpen(true);

  if(e.target.textContent.includes("Add Income")){
    setModalType("Add Income")
  }

  if(e.target.textContent.includes("Add Expense")){
    setModalType("Add Expense")
  }

};

console.log(modalType)

const closeModal = () => {
  setIsOpen(false);
};


const handleSubmit = (formData) => {
  // Handle form submission logic here
  console.log('Form submitted with data:', formData);
  AddEditWalletBalance(formData , modalType)
  
};

const AddEditWalletBalance = (formData, modalType) =>{

  if(modalType === "Add Income"){
    setWalletBalance(walletBalance + parseInt(formData.addbalance));
    closeModal();
  }
  // else{
  //   setWalletBalance(walletBalance - Amount);
  // }

  if(modalType === "Add Expense" ){
    setExpensesList([...expensesList , formData])

    setWalletBalance(walletBalance - formData.price);
    setTotalExpenses(totalExpenses + formData.price)
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
            <h3>Expenses: <span>₹{totalExpenses}</span></h3>
            <button onClick={openModal}>+ Add Expense</button>
         </div>
         <div className="piechart"></div>

         <AddBalanceExpenseModal 
         isOpen={isOpen}
         closeModal={closeModal}
         handleSubmit={handleSubmit}
         modalType = {modalType}
         walletBalance ={walletBalance}
         totalExpenses = {totalExpenses}
         />

      </div>

      <div className="transexpense">
        <div className="recenttransaction">
          <h2>Recent Transactions</h2>
          <table className="table">
            <tbody>
              {expensesList.map((item)=>{
                return(
                  <tr>
                    <td>{item.categoty ==="Food" ? <MdOutlineFastfood/> : item.categoty ==="Travel"? <MdFlight/> : < MdMovieFilter />}</td>
                    <td>
                       {item.title}
                       {formatDate(item.date)}
                    </td>

                    <td>₹{item.price}</td>
                    <td><MdEdit/></td>
                    <td><MdDeleteForever/></td>

                  </tr>
                )
                })}
            </tbody>
          </table>

          <div>
            <HiArrowSmLeft />
            <div>{pagination}</div>
          </div>
        </div>
        <div className="topexpenses"></div>
      </div>
        
    </div>
  );
}

export default App;
 