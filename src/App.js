import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import User from './componets/User';

const App = () => {

   const [users,setUsers] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [fullName, setFullname] = useState('');
   const [username, setUsername] = useState('');
   const [id, setId] = useState(0);
   const [email, setEmail] = useState('');
 
  useEffect(() =>{
    loadData();
  },[])

  const loadData =() => {
    setIsLoading(true)
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
     setUsers(res.data)
     setIsLoading(false)

    })
    .catch(error => {
      toast.error(error)
      setIsLoading(false)
    })
  }

  //Create
  const create = () => {
    if(fullName !== '' && username !== '' && id !== 0 && email !== '' ){
      setIsLoading(true)

      const originalist = users;
      
      const request = {
        name: fullName,
        email: email,
        id: id,
        username: username
      }

      setUsers([request, ...users])


      axios.post('https://jsonplaceholder.typicode.com/users', request)
      .then(res => {
        toast.success('New user created')
        setIsLoading(false)
       })
       .catch(error => {
         setUsers(originalist);
         toast.error(error)
         setIsLoading(false)
       })
    }else{
      toast.error('All inputs are required')
    }
  }
   
  return (
    <>
      <ToastContainer />
      <div className='container'>
        <div  className='row'>

          <div className='col-lg-3 col-12 c4'>

            <h3>Creat new user</h3>
            <br/>
            <input 
              type='number'
              placeholder='ID'
              className='form-control'
              value={id}
              onChange={(e) =>setId(e.target.value)}

            />
              <input 
              type='text'
              placeholder='Full Name'
              className='form-control'
              value={fullName}
              onChange={(e) =>setFullname(e.target.value)}
            />
              <input 
              type='text'
              placeholder='UserName'
              className='form-control'
              value={username}
              onChange={(e) =>setUsername(e.target.value)}
            />
              <input 
              type='email'
              placeholder='Email address'
              className='form-control'
              value={email}
              onChange={(e) =>setEmail(e.target.value)}
            />

            {
              isLoading ? (<>
               <div class="spinner-border text-info" role="status">
                 <span class="visually-hidden">Loading...</span>
               </div> 
              </> ): (<button onClick={create} className='btn btn-success'>CREAT</button>)
            }

          </div>

           <div className='col-lg-9 col-12 c5'>
             <h3>User list</h3>
             {
              isLoading && <>
               <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
             </div>
              
              </>
             }
            
            {
              users.length > 0 ? (
                <>
                 <ol class="list-group list-group-numbered">
                  {
                    users.map(u => (
                      <User user={u}/>
                    ))
                  }
                 </ol>
                </>
                ) : (
                <><p>No ueser found</p></>
              )
            }

           </div>
        </div>
      </div>
    </>
  
  )
}

export default App