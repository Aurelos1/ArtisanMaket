import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TableauAdmin = ({ rowData, columnDefs }) => {
    return (
        <div className="container-fluid">
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows={true} 
                pagination={true} 
                paginationPageSize={20} 
                resizable={true}
                rowSelection="multiple" 
                suppressRowClickSelection = {true}
                
            />
        </div>
        </div>
    );
};

export default TableauAdmin;
