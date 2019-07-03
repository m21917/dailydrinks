import React from 'react';
import Container from '@material-ui/core/Container';
import MaterialTable, { Column } from 'material-table';
import './App.css';

interface Order {
  name: string;
  price: number;
  quantity: number;
  sweet: number;
  ice: number;
  note?: string;
}

interface State {
  columns: Column[];
  data: Order[];
}

function App() {
  const tableStyle = {
    header: {
      backgroundColor: '#ffebe7',
      color: '#b14848',
      fontWidth: 400,
    },
    row: {
      backgroundColor: '#fffdf2',
    },
  };
  const [state, setState] = React.useState<State>({
    columns: [
      { title: '品項', field: 'name' },
      { title: '價格', field: 'price', type: 'numeric'},
      { title: '數量', field: 'quantity', type: 'numeric' },
      {
        title: '甜度',
        field: 'sweet',
        lookup: { 0: '正常', 1: '少糖', 3: '半糖', 4: '微糖', 5: '無糖'},
      },
      {
        title: '冰量',
        field: 'ice',
        lookup: { 0: '常溫', 1: '多冰', 3: '正常', 4: '少冰', 5: '去冰'},
      },
      { title: '備註', field: 'note' },
    ],
    data: [
      { name: '珍珠奶茶', price: 80, quantity: 2, sweet: 3, ice: 5},
      { name: '烏龍綠茶', price: 35, quantity: 1, sweet: 0, ice: 3, note: '我是備註'},
    ],
  });
  return (
    <div className="App">
      <Container fixed>
        <MaterialTable
          title="訂單管理"
          columns={state.columns}
          data={state.data}
          options={{
            search: false,
            headerStyle: tableStyle.header,
            rowStyle: tableStyle.row,
            actionsColumnIndex: -1,
          }}
          localization={{
            header: {
                actions: '操作'
            },
            body: {
                emptyDataSourceMessage: '目前沒有訂單',
                addTooltip: '新增',
                deleteTooltip: '刪除',
                editTooltip: '編輯',
                editRow: {
                  deleteText: '您確定要刪除這筆訂單？',
                  cancelTooltip: '取消',
                  saveTooltip: '儲存',
                }
            }
          }}
          editable={{
            onRowAdd: (newData: Order) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.push(newData);
                  setState({ ...state, data });
                }, 600);
              }),
            onRowUpdate: (newData: Order, oldData: Order) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });
                }, 600);
              }),
            onRowDelete: (oldData: Order) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  setState({ ...state, data });
                }, 600);
              }),
          }}
        />
      </Container>
    </div>
  );
}

export default App;
