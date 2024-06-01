import React from "react";
import Modal from 'react-modal';
import { nanoid } from 'nanoid'
import "./Modal.css"

const AddBalanceExpenseModal = ({ isOpen, closeModal, handleSubmit , modalType , walletBalance ,
  totalExpenses}) => {

    const onSubmit = (e) => {
        e.preventDefault();
        

        if(modalType === "Add Income"){
          const formdata = {addbalance  : e.target.elements.addbalance.value}
          handleSubmit(formdata);
        }

        if(modalType === "Add Expense"){

          if(totalExpenses + parseInt( e.target.elements.price.value) <= walletBalance){
            const formdata = {id : nanoid(),
              categoty : e.target.elements.category.value,
              title : e.target.elements.title.value ,
              date : e.target.elements.date.value,
              price : parseInt( e.target.elements.price.value)}
            handleSubmit(formdata);

          }
          else{
            console.log("error in expenses price")
          }
          
        }
        
      };
    

    return(
        <div>
            <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Formal Details Modal"
      className="mymodal"
        overlayClassName="myoverlay"
    >
      
      {modalType ==="Add Income" ? 
      (<>
      <h2>Add Balance</h2>

      <form onSubmit={onSubmit} className="addbalance">
         <input className=" textinput" type="text"  name = "addbalance" required pattern="^[0-9]*$" placeholder="Income Amount"/>
         <button  className="submitbutton"type="submit">Add Balance</button>
         <button onClick={closeModal} className="cancelbutton">Cancel</button>
      </form>
      
      </>)
      : modalType === "Add Expense" ? 
      (
      <div>
        <h2>Add Expenses</h2>
      <form onSubmit={onSubmit}>
          <input type="text"  name = "title" required  placeholder="Title"/>
          <input type="text"  name = "price" required  pattern="^[0-9]*$" placeholder="Price"/>
          
          <select  name ="category" placeholder= "Select Category">
          <option value="none" selected disabled hidden>  
            Select Category 
        </option> 
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>

          </select>

          <input type="date" 
          name ="date"
           min="1997-01-01" 
           max="2030-12-31"/>
        
        <button type="submit">Submit</button>
        <button onClick={closeModal}>Close Modal</button>
      </form>
       </div>) : 
      (<div>

      </div>) } 

      
    </Modal>
    </div>
    )

}

export default AddBalanceExpenseModal;