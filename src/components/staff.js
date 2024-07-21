import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Modal } from "antd";

function Staff() {
  const [staffData, setStaffData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getStaff = async () => {
    try{
    await axios
      .get("https://tamizhstaff.onrender.com/staff/get-staff")
      .then((response) => {
        setStaffData(response.data);
      });
    }catch(err){
        console.log(err)
    }
  };
  useEffect(() => {
    getStaff();
  }, []);

  async function deleteStaff(index) {
    console.log(index);
    try{
    await axios
      .post("https://tamizhstaff.onrender.com/staff/delete-staff", {
        "staffId": index
      })
      .then((response) => {
        setStaffData(response.data);
      });
    }catch(err){
        console.log(err.message)
        getStaff();
    }
  }

  async function addStaff(e) {
    e.preventDefault();
    let Data = new FormData(formRef.current);
    let currentData = Object.fromEntries(Data);
    console.log(currentData);
    try{
    await axios
      .post("https://tamizhstaff.onrender.com/staff/staff", currentData)
      .then((response) => {
        console.log(response.data);
      });
    }catch(err){
        console.log(err)
    }
    getStaff();
    setIsModalOpen(false);
    formRef.current.reset()
  }

  return (
    <div style={{"backgroundColor":"bisque"}}>
      <h1 style={{"color":"red"}}>Tamizh staff List</h1>
      <>
        <Button type="primary" onClick={showModal} className="mt-4">
          <i className="fa-solid fa-plus"></i> Add Info
        </Button>
        <Modal
          title="Staff registration"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer
        >
          <form ref={formRef}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="staff_name"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input placeholder"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="domain" className="form-label">
                Domain
              </label>
              <input
                type="text"
                name="domain"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input placeholder"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="Phone Number" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                name="staff_PhoneNumber"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Another input placeholder"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="Phone Number" className="form-label">
                Image
              </label>
              <input
                type="text"
                name="image"
                className="form-control"
                id="file"
                placeholder="upload file"
              ></input>
            </div>
            <Button type="primary" onClick={addStaff}>
              Add staff
            </Button>
          </form>
        </Modal>
      </>

      <div className="d-flex row ">
        {staffData.map((staff, index) => {
          return (
            <div className="col-md-4 w-67 ">
              <Card className="p-2 m-5 w-67">
                <div className="w-100">
                  <Image
                    rounded={true}
                    variant="top"
                    className="h-50 w-50"
                    src={staff.image}
                  />
                </div>
                <Card.Body>
                  <Card.Title>Name :{staff.staff_name}</Card.Title>
                  <Card.Text>Domain :{staff.domain}</Card.Text>
                  <Card.Text>Phone Number:{staff.staff_PhoneNumber}</Card.Text>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      deleteStaff(staff._id);
                    }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Staff;