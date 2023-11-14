import { Container, Row, Table } from "react-bootstrap";
import Menu from "../components/Menu.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContactList } from "../features/contactSlice.jsx";

function Contact() {
  const data = useSelector((state) => state.contact.data);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactList());
  }, [dispatch]);
  return (
    <div>
      <Menu />
      <Container>
        {/* <div>{loading ? "Loading..." : ""}</div> */}
        <Row>
          <Table className="mt-3" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Acton</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((kontak, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{kontak.fullName}</td>
                    <td>{kontak.email}</td>
                    <td>action</td>
                  </tr>
                ))
              ) : loading ? (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4}>{error ? error : "data kosong"}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
