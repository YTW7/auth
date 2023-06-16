import Head from 'next/head'
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import Table from '../components/Table';
import Form from '../components/Form';
import { useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { toggleChangeAction, deleteAction } from '../redux/reducer';
import { deleteUser, getUsers } from '../lib/helper';
import { useQueryClient } from 'react-query';

export default function Home() {


  const visible = useSelector((state) => state.app.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId)
  const queryclient = useQueryClient();

  const dispatch = useDispatch()

  // const [visible, setVisible] = useState(false)

  const handler = () => {
    dispatch(toggleChangeAction())
  }

  const deletehandler =  async () => {
    if(deleteId){
      await deleteUser(deleteId);
      await queryclient.prefetchQuery('users', getUsers)
      await dispatch(deleteAction(null))
    }
  }

  const canclehandler = async () => {
    console.log("cancel")
    await dispatch(deleteAction(null))
  }

  return (
    <section>
      <Head>
        <title>CRUD Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='py-5'>
        <h1 className='text-xl md:text-5xl text-center font-bold py-10'>Employee Management</h1>

        <div className="container mx-auto flex justify-between py-5 border-b">
            <div className="left flex gap-3">
                <button onClick={handler} className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800'>
                  Add Employee <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
                </button>
            </div>
            { deleteId ? DeleteComponent({ deletehandler, canclehandler }) : <></>}
        </div>

        {/* collapsable form */}
        { visible ? <Form/> : <></>}

        {/* table */}
        <div className="container mx-auto">
          <Table/>
        </div>

      </main>
    </section>
  )
}

function DeleteComponent({ deletehandler, canclehandler }){
  return (
    <div className='flex gap-5'>
        <button>Are you sure?</button>
        <button onClick={deletehandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>
          Yes <span className='px-1'><BiX color='rgb(255 255 255)' size={25} /></span></button>
        <button onClick={canclehandler} className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50'>
          No <span className='px-1'><BiCheck color='rgb(255 255 255)' size={25} /></span></button>
    </div>
  )
}