
import { Formik, useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ChangePasswordSchema } from '../Utils/Validation/Validation';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordActions, clear_changepassword_slice } from '../Utils/Store/AuthSlice/ChangepasswordSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import SpinnerLoder from '../CommonComponents/SpinnerLoder';
function ChangePassword({ show, setShow }) {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch()
  const changePasswordData = useSelector((store) => { return store.CHANGE_PASSWORD_SLICE })

  const id = localStorage.getItem("user_id")
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values) => {

      dispatch(changePasswordActions({
        id: id,
        password: formik.values.password,
        newPassword: formik.values.newPassword,
        confirmPassword: formik.values.confirmPassword
      }))
    }
  })

  useEffect(() => {
    if (changePasswordData?.isSuccess) {
      toast.success(changePasswordData?.data?.message)
      setShow(false)
      dispatch(clear_changepassword_slice())
    }
    if (changePasswordData?.isError) {
      toast.error(changePasswordData?.error?.message)
      dispatch(clear_changepassword_slice())
    }
  }, [changePasswordData])
  return (
    <>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className='cmn_heading_style '>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='form-group'>
              <label>Old Password</label>
              <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type='password' className='form-control' />
              {formik.touched.password && formik.errors.password ? <p className="error">{formik.errors.password}</p> : ""}
            </div>

            <div className='form-group'>
              <label>New Password</label>
              <input name='newPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type='password' className='form-control' />
              {formik.touched.newPassword && formik.errors.newPassword ? <p className="error">{formik.errors.newPassword}</p> : ""}
            </div>
            <div className='form-group'>
              <label>Confirm Password</label>
              <input name='confirmPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} type='password' className='form-control' />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="error">{formik.errors.confirmPassword}</p> : ""}
            </div>

            <div className='text-end chanage_pass_btn_outer mt-3'>
              <button className='cancel_button me-3' type='button' onClick={handleClose}>
                Cancel
              </button>
              <button className='cmn_btn' type='submit'>
                {changePasswordData?.loading ? <SpinnerLoder /> : "Save"}
              </button>

            </div>
          </Modal.Body>


        </form>
      </Modal>
    </>
  );
}

export default ChangePassword;