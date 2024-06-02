import React, { useState } from "react";
import Modal from 'react-modal';
import { nanoid } from 'nanoid'
import "./Modal.css"
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

const AddBalanceExpenseModal = ({ isOpen, closeModal, handleSubmit , modalType , walletBalance ,
  totalExpenses , edititem}) => {

    const[editdata , setEditData] = useState(edititem );

    // console.log(editdata)

    const handleChange = (e) => {
      setEditData({ ...edititem, [e.target.name]: e.target.value });
  };


    const onSubmit = (e) => {
        e.preventDefault();
        

        if(modalType === "Add Income"){
          const formdata = {addbalance  : e.target.elements.addbalance.value}
          handleSubmit(formdata);
        }

        else if(modalType === "Add Expense"){

          if(totalExpenses + parseInt( e.target.elements.price.value) <= walletBalance){
            const formdata = {id : nanoid(),
              category : e.target.elements.category.value,
              title : e.target.elements.title.value ,
              date : e.target.elements.date.value,
              price : parseInt( e.target.elements.price.value)}
            handleSubmit(formdata);

          }
          else{
            console.log("error in expenses price");
            enqueueSnackbar('Wallet Balance is not sufficient to add the expense' , { variant: 'warning' })
          }
          
        }

        else{
          if(totalExpenses + parseInt( e.target.elements.price.value) <= walletBalance){
            const formdata = {id : edititem.id,
              category : e.target.elements.category.value,
              title : e.target.elements.title.value ,
              date : e.target.elements.date.value,
              price : parseInt( e.target.elements.price.value)}
              setEditData({})
            handleSubmit(formdata);

          }
          else{
            console.log("error in expenses price")
            enqueueSnackbar('Wallet Balance is not sufficient to add the expense' , { variant: 'warning' })
          }

        }
        
      };
    

    return(
        <div>
          <SnackbarProvider  hideIconVariant/>
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
         <input className="textinput" type="text"  name = "addbalance" required pattern="^[0-9]*$" placeholder="Income Amount"/>
         <button  className="submitbutton" type="submit">Add Balance</button>
         <button onClick={closeModal} className="cancelbutton">Cancel</button>
      </form>
      
      </>)
      : modalType === "Add Expense" ? 
      (
      <div>
        <h2>Add Expenses</h2>
      <form onSubmit={onSubmit}>
          <input type="text"  className="textinput" name = "title" required  placeholder="Title"/>
          <input type="text"  className="textinput" name = "price" required  pattern="^[0-9]*$" placeholder="Price"/>
          
          <select className="textinput addwidth" name ="category" placeholder= "Select Category">
          <option value="none" selected disabled hidden>  
            Select Category 
        </option> 
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>

          </select>

          <input type="date" 
          className="textinput"
          name ="date"
           min="1997-01-01" 
           max="2030-12-31"/>
        
        <button type="submit" className="submitbutton addwidth">Add Expense</button>
        <button onClick={closeModal} className="cancelbutton">Close Modal</button>
      </form>
       </div>) : 
      (<div>
          <h2>Edit Expenses</h2>
      <form onSubmit={onSubmit}>
          <input type="text"  className="textinput" name = "title" value = {editdata.title} required  placeholder="Title" onChange={handleChange}/>
          <input type="text" className="textinput"  name = "price"  value = {editdata.price}required  pattern="^[0-9]*$" placeholder="Price" onChange={handleChange}/>
          
          <select  name ="category" className="textinput addwidth" value={editdata.category} placeholder= "Select Category" onChange={handleChange}>
          
            <option value="Food">Food</option>
            <option value="Entertainment" >Entertainment</option>
            <option value="Travel">Travel</option>

          </select>

          <input type="date" s
          value = {editdata.date}
          className="textinput"
          name ="date"
           min="1997-01-01" 
           max="2030-12-31"
           onChange={handleChange}
           />
        
        <button type="submit" className="submitbutton addwidth">Add Expense</button>
        <button onClick={closeModal} className="cancelbutton">Close Modal</button>
      </form>
      </div>) } 

      
    </Modal>
    </div>
    )

}

export default AddBalanceExpenseModal;