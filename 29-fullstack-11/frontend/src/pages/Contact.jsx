import { Button, Container, Row, Table } from "react-bootstrap";
import Menu from "../components/Menu.jsx";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  deleteKontak,
  detailKontak,
  getContactList,
} from "../features/contactSlice.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Swal from "sweetalert2";

function Contact() {
  const data = useSelector((state) => state.contact.data);
  const dataDelete = useSelector((state) => state.contact.dataDelete);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);

  const actionDel = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Konfirmasi",
      text: "Yakin akan dihapus?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteKontak(id));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };
  useEffect(() => {
    dispatch(getContactList());
  }, [dispatch]);

  useEffect(() => {
    if (dataDelete) {
      Swal.fire({
        title: "Success !",
        text: dataDelete.message,
        icon: "success",
      });
      dispatch(getContactList());
    }
  }, [dataDelete, dispatch]);

  return (
    <div>
      <Menu />
      <Container>
        <div className="mt-3">
          <ContactForm show={modalShow} onHide={() => setModalShow(false)} />
          <Button
            variant="primary btn-sm me-3"
            onClick={() => {
              dispatch(
                detailKontak({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  Addresses: [
                    {
                      addressType: "",
                      street: "",
                      city: "",
                      province: "",
                      country: "",
                      zipCode: "",
                    },
                  ],
                })
              );
              setModalShow(true);
            }}
          >
            {" "}
            Tambah
          </Button>
          {loading ? "Loading..." : ""}
        </div>
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
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => actionDel(kontak.contactId)}
                      >
                        Delete
                      </button>
                      <button
                        className="ms-2 btn btn-sm btn-primary"
                        onClick={() => {
                          dispatch(detailKontak(kontak));
                          setModalShow(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
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
