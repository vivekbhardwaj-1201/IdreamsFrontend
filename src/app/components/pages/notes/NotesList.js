import React, { useState, useEffect, useRef } from 'react'
import classes from './Notes.module.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash';
import { v4 } from "uuid";
import { notesApi } from "../../../utils/notes.api";
import Preloader from "../../common/actions/Preloaders/Preloader";



import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const NotesList = () => {
  const [title, setTitle] = useState("");
  const [descp, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);

  let [completedNotesData, setCompletedNotesData] = useState([]);
  const [inProgress, setInProgressData] = useState([
    { title: "test", description: "Test 1" }
  ]);
  const [createNotes, setCreateNotesData] = useState([]);
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  }
  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
    console.log("description", descp);
  }

  useEffect(() => {
    console.log("fetching data");
    getData();
  },[change]);

  const addData = async () => {
    let obj = {
      title: title,
      description: descp
    }
    if (title === "" || descp==="") {
			toast.warn("Fill the required Fields");
			return;
		}
    const authToken = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
	  let result = await axios.post(`http://localhost:8000/user/userId/${userId}/createnote`, obj, 
		{headers: { authorization: `Bearer ${authToken}`}});
    if(result.data.isSuccess){
      toast.success(result.data.message);
      setChange(prev => !prev);
    }
    else{
      toast.error(result.data.message);
    }
    console.log(result);
    //  getData();`
  } 
  useEffect(() => {
    console.log("completedNotesData",completedNotesData);
  }, [completedNotesData]);


  async function getData(){
    // Update the document title using the browser API
    const authToken = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
		let result = await axios.get(`http://localhost:8000/user/userId/${userId}/getAllNotes`,
		{headers: { authorization: `Bearer ${authToken}`}});
    console.log(result);
    if(result.data.isSuccess){
      // setCompletedNotesData(completedNotesData => [...completedNotesData, result.data.Data.notes])
      setCompletedNotesData(result.data.Data.notes);
      console.log(result.data.Data.notes);
      completedNotesData = result.data.Data.notes;
      console.log("response",completedNotesData.length);
    }
    else{
      toast.error(result.data.message);
    }
  }

 


//   const item = {
//     id: v4(),
//     name: "dasdasd",
//   }
//   const item2 = {
//     id: v4(),
//     name: "vivek"
//   }
//   const [state, setState] = useState({
//     "todo": {
//       title: "Todo",
//       items: [itme]
//     },
//     "in-progress": {
//       title: " In-progress",
//       items: [item2]
//     },
//     "completed": {
//       title: "Completed",
//       items: []
//     }
//   })

  return (
//     <DragDropContext onDragEnd={e => console.log(e)}>
//       {
//         _.map(state, (data, key) => {
//           return (
//             <div className={classes.ProjectOuter}>
//               <div className={classes.projectBox}>
//                 <div className={classes.boxHeader} key={key}>
//                   <h2 className={classes.boxHeading}>{data.title}</h2>
//                   <p className={classes.count}>2</p>
//                 </div>
//                 <button className={classes.addBtn}><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M6 0C6.19891 0 6.38968 0.0856024 6.53033 0.237976C6.67098 0.390349 6.75 0.597012 6.75 0.8125V5.6875H11.25C11.4489 5.6875 11.6397 5.7731 11.7803 5.92548C11.921 6.07785 12 6.28451 12 6.5C12 6.71549 11.921 6.92215 11.7803 7.07452C11.6397 7.2269 11.4489 7.3125 11.25 7.3125H6.75V12.1875C6.75 12.403 6.67098 12.6097 6.53033 12.762C6.38968 12.9144 6.19891 13 6 13C5.80109 13 5.61032 12.9144 5.46967 12.762C5.32902 12.6097 5.25 12.403 5.25 12.1875V7.3125H0.75C0.551088 7.3125 0.360322 7.2269 0.21967 7.07452C0.0790176 6.92215 0 6.71549 0 6.5C0 6.28451 0.0790176 6.07785 0.21967 5.92548C0.360322 5.7731 0.551088 5.6875 0.75 5.6875H5.25V0.8125C5.25 0.597012 5.32902 0.390349 5.46967 0.237976C5.61032 0.0856024 5.80109 0 6 0V0Z" fill="#329C89" />
//                 </svg>
//                 </button>
//                 <Droppable droppableId={key}>
//                   {(provided, snapshots) => {
//                     return (     
//                       <>
//                     {data.items.map((el,index)=>{
//                         <Draggable key={el.id} index={index} draggableId={el.id}>
//                         {(provided,snapshots)=>(
//                         <div
//                           className={classes.card}
//                           ref={provided.innerRef}
//                           {...provided.droppableProps}
//                           {...provided.dragHandleProps}
//                           onBlur={addData}
//                         >
//                           {el.name}
//                           <input className={classes.inputText} type='text' placeholder='Enter Title' onChange={onTitleChange} />
//                           <input className={classes.inputText} type='text' placeholder='Description' onChange={onDescriptionChange} />
//                         </div>
//                         )}
//                       </Draggable> 
//                     })}  
//                     </>                
//                     )
//                   }}
//                 </Droppable>
//               </div>
//             </div>
//           )
//         })
//       }
<DragDropContext>
       <div className={classes.flexbox}>
      <div className={classes.header}>
        <p className={classes.name}>HI, VIVEK</p>
      </div>
      <div className={classes.notesOuter}>
      <h1 className={classes.heading}>Projects</h1>
      <div className={classes.ProjectOuter}>
        <div className={classes.projectBox}>
          <div className={classes.boxHeader}>
            <h2 className={classes.boxHeading}>To Do</h2>
            <p className={classes.count}>{createNotes.length}</p>
          </div>
          <button className={classes.addBtn} onClick={addData}><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0C6.19891 0 6.38968 0.0856024 6.53033 0.237976C6.67098 0.390349 6.75 0.597012 6.75 0.8125V5.6875H11.25C11.4489 5.6875 11.6397 5.7731 11.7803 5.92548C11.921 6.07785 12 6.28451 12 6.5C12 6.71549 11.921 6.92215 11.7803 7.07452C11.6397 7.2269 11.4489 7.3125 11.25 7.3125H6.75V12.1875C6.75 12.403 6.67098 12.6097 6.53033 12.762C6.38968 12.9144 6.19891 13 6 13C5.80109 13 5.61032 12.9144 5.46967 12.762C5.32902 12.6097 5.25 12.403 5.25 12.1875V7.3125H0.75C0.551088 7.3125 0.360322 7.2269 0.21967 7.07452C0.0790176 6.92215 0 6.71549 0 6.5C0 6.28451 0.0790176 6.07785 0.21967 5.92548C0.360322 5.7731 0.551088 5.6875 0.75 5.6875H5.25V0.8125C5.25 0.597012 5.32902 0.390349 5.46967 0.237976C5.61032 0.0856024 5.80109 0 6 0V0Z" fill="#329C89" />
          </svg>
          </button>
          <Droppable droppableId='todoList'>
            {
              (provided)=>(
                <div 
                  className={classes.card} 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  
                >
                <input className={classes.inputText} type='text' placeholder='Enter Title' onChange={onTitleChange} />
                <input className={classes.inputText} type='text' placeholder='Description' onChange={onDescriptionChange} />
              </div>
              )
            }

          </Droppable>
        </div>


        
        <div className={classes.projectBox}>
          <div className={classes.boxHeader}>
            <h2 className={classes.boxHeading}>In Progress</h2>
            <p className={classes.count}>{inProgress.length}</p>
          </div>
          <button className={classes.addBtn}><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0C6.19891 0 6.38968 0.0856024 6.53033 0.237976C6.67098 0.390349 6.75 0.597012 6.75 0.8125V5.6875H11.25C11.4489 5.6875 11.6397 5.7731 11.7803 5.92548C11.921 6.07785 12 6.28451 12 6.5C12 6.71549 11.921 6.92215 11.7803 7.07452C11.6397 7.2269 11.4489 7.3125 11.25 7.3125H6.75V12.1875C6.75 12.403 6.67098 12.6097 6.53033 12.762C6.38968 12.9144 6.19891 13 6 13C5.80109 13 5.61032 12.9144 5.46967 12.762C5.32902 12.6097 5.25 12.403 5.25 12.1875V7.3125H0.75C0.551088 7.3125 0.360322 7.2269 0.21967 7.07452C0.0790176 6.92215 0 6.71549 0 6.5C0 6.28451 0.0790176 6.07785 0.21967 5.92548C0.360322 5.7731 0.551088 5.6875 0.75 5.6875H5.25V0.8125C5.25 0.597012 5.32902 0.390349 5.46967 0.237976C5.61032 0.0856024 5.80109 0 6 0V0Z" fill="#329C89" />
          </svg>
          </button>
          <Droppable droppableId='inProgressList'>
          {
              (provided)=>(                
                <>
                {
                  inProgress.map((inProgressEle,i)=>(
                  <div
                  className={classes.card}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  index={i}
                  >
                  <input className={classes.inputText} value={inProgressEle.title} type='text' placeholder='Enter Your Task Name' />
                  <input className={classes.inputText} value={inProgressEle.description} type='text' placeholder='Description' />
                   </div>
                  ))
                }
                </>
              )
              
          }

          </Droppable>
        </div>



        <div className={classes.projectBox}>
          <div className={classes.boxHeader}>
            <h2 className={classes.boxHeading}>Completed</h2>
            <p className={classes.count}>{completedNotesData.length}</p>
          </div>
          <button className={classes.addBtn}><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 0C6.19891 0 6.38968 0.0856024 6.53033 0.237976C6.67098 0.390349 6.75 0.597012 6.75 0.8125V5.6875H11.25C11.4489 5.6875 11.6397 5.7731 11.7803 5.92548C11.921 6.07785 12 6.28451 12 6.5C12 6.71549 11.921 6.92215 11.7803 7.07452C11.6397 7.2269 11.4489 7.3125 11.25 7.3125H6.75V12.1875C6.75 12.403 6.67098 12.6097 6.53033 12.762C6.38968 12.9144 6.19891 13 6 13C5.80109 13 5.61032 12.9144 5.46967 12.762C5.32902 12.6097 5.25 12.403 5.25 12.1875V7.3125H0.75C0.551088 7.3125 0.360322 7.2269 0.21967 7.07452C0.0790176 6.92215 0 6.71549 0 6.5C0 6.28451 0.0790176 6.07785 0.21967 5.92548C0.360322 5.7731 0.551088 5.6875 0.75 5.6875H5.25V0.8125C5.25 0.597012 5.32902 0.390349 5.46967 0.237976C5.61032 0.0856024 5.80109 0 6 0V0Z" fill="#329C89" />
          </svg>
          </button>
          <Droppable droppableId='inCompletedList'>
          {
              (provided)=>(                
                <>
                {
                  completedNotesData.map((inCompletedEle,i)=>(
                  <div
                  className={classes.card}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  index={i}
                  >
                  <input className={classes.inputText} value={inCompletedEle.title} type='text' placeholder='Enter Your Task Name' />
                  <input className={classes.inputText} value={inCompletedEle.description} type='text' placeholder='Description' />
                   </div>
                  ))
                }
                </>
              )              
          }
          </Droppable>

        </div>
      </div>
      </div>

      </div>
    </DragDropContext>
  )
}







// const item = {
//   id: v4(),
//   name: "Clean the house"
// }

// const item2 = {
//   id: v4(),
//   name: "Wash the car"
// }
//   const [text, setText] = useState("")
//   const [state, setState] = useState({
//     "todo": {
//       title: "Todo",
//       items: [item, item2]
//     },
//     "in-progress": {
//       title: "In Progress",
//       items: []
//     },
//     "done": {
//       title: "Completed",
//       items: []
//     }
//   })

//   const handleDragEnd = ({destination, source}) => {
//     if (!destination) {
//       return
//     }

//     if (destination.index === source.index && destination.droppableId === source.droppableId) {
//       return
//     }

//     // Creating a copy of item before removing it from state
//     const itemCopy = {...state[source.droppableId].items[source.index]}

//     setState(prev => {
//       prev = {...prev}
//       // Remove from previous items array
//       prev[source.droppableId].items.splice(source.index, 1)


//       // Adding to new items array location
//       prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

//       return prev
//     })
//   }

//   const addItem = () => {
//     setState(prev => {
//       return {
//         ...prev,
//         todo: {
//           title: "Todo",
//           items: [
//             {
//               id: v4(),
//               name: text
//             },
//             ...prev.todo.items
//           ]
//         }
//       }
//     })

//     setText("")
//   }

//   return (
//     <div className={classes.App}>
//       <div>
//         <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
//         <button onClick={addItem}>Add</button>
//       </div>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         {_.map(state, (data, key) => {
//           return(
//             <div key={key} className={classes.column}>
//               <h3>{data.title}</h3>
//               <Droppable droppableId={key}>
//                 {(provided, snapshot) => {
//                   return(
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                       className={classes.droppableCol}
//                     >
//                       {data.items.map((el, index) => {
//                         return(
//                           <Draggable key={el.id} index={index} draggableId={el.id}>
//                             {(provided, snapshot) => {
//                               console.log(snapshot)
//                               return(
//                                 <div
//                                   className={`${classes.item} ${snapshot.isDragging && classes.dragging}`}
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   {el.name}
//                                 </div>
//                               )
//                             }}
//                           </Draggable>
//                         )
//                       })}
//                       {provided.placeholder}
//                     </div>
//                   )
//                 }}
//               </Droppable>
//             </div>
//           )
//         })}
//       </DragDropContext>
//     </div>
//   );

export default NotesList