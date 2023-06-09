import React, { useEffect } from 'react'

import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Link from 'antd/es/typography/Link';
import { getColors } from '../features/color/colorSlice';
import { useLocation } from 'react-router-dom';


const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },

];


const Colorlist = () => {

    const location = useLocation()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors())
    }, [])
    const colorState = useSelector((state) => state.color.colors);
    

    const data1 = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            name: colorState[i].title,
            action: (<>
                <Link to={`/admin/color/${colorState[i]._id}`} className='fs-3 text-danger'> <BiEdit /></Link>
                <Link to="/" className='ms-3 fs-3 text-danger'> <AiFillDelete /></Link>
            </>)
        });
    }
    return (
        <div >
            <h3 className='mb-4 title'>Colors</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Colorlist