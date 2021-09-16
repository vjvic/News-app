import React /* , { useState } */ from "react";
import useStyles from "./styles";
import {
  Backdrop,
  Modal,
  Fade,
  TextField,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { signup } from "Redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = ({ openSignup, handleCloseSignup }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { errorText } = useSelector((state) => state.ui);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    dispatch(signup(data.email, data.password));
    e.target.reset();
  };

  return (
    <Modal
      className={classes.modal}
      open={openSignup}
      onClose={handleCloseSignup}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openSignup}>
        <div className={classes.paper}>
          <Typography variant="h4" component="h2">
            Signup
          </Typography>
          {errorText && (
            <Alert severity="error" className={classes.error}>
              {errorText}
            </Alert>
          )}
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <Box py={1}>
              <TextField
                error={errors?.email?.message.length > 0}
                label="Email"
                {...register("email")}
                helperText={errors?.email?.message}
                fullWidth
              />
            </Box>

            <Box py={1}>
              <TextField
                error={errors?.password?.message.length > 0}
                label="Password"
                type="password"
                {...register("password")}
                helperText={errors?.password?.message}
                fullWidth
              />
            </Box>

            <Box py={1}>
              <TextField
                error={errors?.confirmPassword?.message.length > 0}
                label="Confirm Password"
                type="password"
                {...register("confirmPassword")}
                helperText={errors?.confirmPassword?.message}
                fullWidth
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.formBtn}
            >
              Signup
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default Signup;
