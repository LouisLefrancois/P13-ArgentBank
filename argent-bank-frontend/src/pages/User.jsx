import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName } from "../redux/userSlice";
import { authAPI } from "../services/api";

function User() {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName || "");
  const [newLastName, setNewLastName] = useState(lastName || "");
  const [error, setError] = useState("");

  const handleEditName = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await authAPI.updateProfile(newFirstName, newLastName);

      dispatch(
        updateUserName({
          firstName: newFirstName,
          lastName: newLastName,
        })
      );

      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <div>
            {/* <h1>Edit user info</h1> */}
            <h1>Welcome Back</h1>

            <form onSubmit={handleEditName}>
              <div className="lastname-firstname-wrapper">
                <div className="input-wrapper">
                  {/* <label htmlFor="firstName">First Name</label> */}
                  <input
                    type="text"
                    id="firstName"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                </div>
                <div className="input-wrapper">
                  {/* <label htmlFor="lastName">Last Name</label> */}
                  <input
                    type="text"
                    id="lastName"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                </div>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="savecancel-wrapper">
                <button type="submit" className="edit-button-save">
                  Save
                </button>
                <button
                  type="button"
                  className="edit-button-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {firstName} {lastName}!
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default User;
