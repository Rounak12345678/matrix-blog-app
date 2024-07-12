import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Grid, TextField } from "@mui/material";

// Define validation schema using yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

const CreateBlogForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <p className="label">Title</p>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <TextField {...field} />}
          />
          <p className="error">{errors.title?.message}</p>
        </Grid>
        <Grid item xs={12}>
          <p className="label">Content</p>
          <Controller
            name="content"
            control={control}
            render={({ field }) => <TextField multiline rows={4} {...field} />}
          />
          <p className="error">{errors.content?.message}</p>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Create Blog
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateBlogForm;
