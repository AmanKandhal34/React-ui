import DataTable from "./compo/DataTable"
import Input from "./compo/Input"
// const columns = [
//   { key: "id", title: "ID", dataIndex: "id", sortable: true },
//   { key: "name", title: "Name", dataIndex: "name", sortable: true },
//   { key: "age", title: "Age", dataIndex: "age", sortable: true },
//   { key: "email", title: "Email", dataIndex: "email" },
// ];

// const data = [
//   { id: 1, name: "Aman", age: 22, email: "aman@example.com" },
//   { id: 2, name: "Rahul", age: 25, email: "rahul@example.com" },
//   { id: 3, name: "Sneha", age: 21, email: "sneha@example.com" },
// ];

function App() {
  return (
    <div >
      <div>
        <Input label={'Hello'} placeholder={'hi iam from app.jsx'} helper={'help'} size={'sm'} variant={'filled'} disabled={false} error={false} loading={false} clear={true} type={'text'} />
      </div>
      <div>
        <h2>DataTable Demo</h2>
        <DataTable
        />
      </div>
    </div>
  );
}
export default App;
