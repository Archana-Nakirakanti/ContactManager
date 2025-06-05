import React, { useState } from "react";
export default function ContactManager(){
    const [contacts,setContacts]=useState([]);
    const [formData,setFormData]=useState({name:'',email:'',phone:''});
    const [editIndex,setEditIndex]=useState(null);
    const [errors,setErrors]=useState({})
    
    function validate(fieldValues= formData){
       const tempErrors={}
       if(!fieldValues.name.trim()) tempErrors.name='Name is required';
       if(!fieldValues.email.trim()) {
        tempErrors.email ='Email is required';
       }
       else if(!/\S+@\S+\.\S+/.test(fieldValues.email)){
        tempErrors.email='Invalid Email';
       }
       if(!fieldValues.phone.trim()) {
        tempErrors.phone='Phone number is required';
       }
       else if(!/^\d{10}$/.test(fieldValues.phone)){
        tempErrors.phone='phone must have valid 10 digits'
       }
       return tempErrors;
    }
    function handleChange(e){
        const {name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }
    function handleSubmit(e)
    {
        e.preventDefault();
        const validationErrors =validate();
        setErrors(validationErrors);
        if(Object.keys(validationErrors).length >0)
        {
            return;
        }
        if(editIndex == null)
        {
            setContacts(prev=>[...prev,formData]);
        }
        else{
            setContacts(prev=> {
                const updated=[...prev];
                updated[editIndex]=formData;
                return updated;
            });
            setEditIndex(null);
        }
        setFormData({name:'',email:'',phone:''});
        setErrors({});
    }
    function handleEdit(index){
       setFormData(contacts[index])
       setEditIndex(index)
       setErrors({})
    }
    function handleDelete(index){
        if(window.confirm('Are you sure u want to delete')){
            setContacts(prev=>prev.filter((_,i)=>i!==index));
            if(editIndex==index)
            {
                setFormData({name:'',email:'',phone:''});
                setEditIndex(null)
            }
        }
    }
    return(
        <div style={{textAlign:'center',padding:'20px',backgroundColor:'lightblue'}}>
            <h2>Contact manager</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>EMail</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <label>Phone</label>
                    <input type="phone" name="phone" value={formData.phone} onChange={handleChange}/>
                    {errors.phone && <p>{errors.phone}</p>}
                </div>
                <div>
                    <button type="submit">{editIndex ==null? 'Add Contact':'Update Contact'}</button>
                </div>
            </form>
            {contacts.length===0?(
                <p>No Contacts added yet</p>
            ):(
                <div style={{marginTop:'20px',alignItems:'center', padding:'10px',border:'1px solid #ccc',borderRadius:'5px',backgroundColor:'pink'}}>
                    <h3>Contact List</h3>
                    <table style={{width:'100%',borderCollapse:'collapse',textAlign:'left',backgroundColor:'lightyellow',borderRadius:'5px',cellspacing:'10px'}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact,index)=>
                               <tr key={index}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <button onClick={()=>handleEdit(index)}>Edit</button>
                                <button onClick={()=>handleDelete(index)}>Delete</button>
                               </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    )
}