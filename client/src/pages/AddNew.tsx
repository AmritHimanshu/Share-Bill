import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AddNew() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [noOfInputs, setNoOfInputs] = useState([{ memberName: "" }, { memberName: "" }]);

    const handleDeleteInput = (index: number) => {
        const newArray = [...noOfInputs];
        newArray.splice(index, 1);
        setNoOfInputs(newArray);
    }

    const handleAddInput = () => {
        setNoOfInputs([...noOfInputs, { memberName: "" }]);
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        let onChangedValue = [...noOfInputs];
        onChangedValue[index].memberName = value;

        setNoOfInputs(onChangedValue);
    }

    const handleOnCreate = async (e: any) => {
        e.preventDefault();
        if (title === "") return window.alert("Enter the Title");
        noOfInputs.map((item, index) => {
            if (item.memberName === "") return window.alert(`Member ${index + 1} is empty`);
        });

        const memberNames = noOfInputs.map(input => input.memberName);
        // console.log(memberNames);

        try {
            const res = await fetch('/createBill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    title, memberNames
                })
            });

            const data = await res.json();
            if (res.status !== 200 || !data) {
                return window.alert(`${data.error}`);
            }
            else {
                console.log(data);
                navigate('/view-bill');
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="addNew-container">
            <div className="addNew-container-title">
                Add New
            </div>
            <form>
                <div className="addNew-form-title">
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                {noOfInputs.map((item, index) => (
                    <div key={index}>
                        <div className="addNew-form-member">
                            <label htmlFor={`member${index + 1}`}>Member {index + 1}:</label>
                            <div className="addNew-form-member-input">
                                <input id={`member${index + 1}`} name={`member${index + 1}`} value={item.memberName} type="text" placeholder="Enter name" onChange={(e) => handleOnChange(e, index)} />

                                {index >= 2 && <DeleteIcon style={{ cursor: "pointer" }} onClick={() => handleDeleteInput(index)} />}
                            </div>
                        </div>

                        {index === noOfInputs.length - 1 &&
                            <div className="add-members-button" onClick={handleAddInput}>
                                {/* + Add Members */}
                                <AddCircleOutlineIcon style={{ marginRight: '5px' }} /> Add Members
                            </div>
                        }
                    </div>
                ))}

                <button className="addNew-create-button" onClick={handleOnCreate}>Create</button>
            </form>
        </div>
    )
}

export default AddNew