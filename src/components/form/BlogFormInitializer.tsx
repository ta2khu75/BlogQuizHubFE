import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BlogRequest } from "@/types/request/BlogRequest";
import { useAppSelector } from "@/redux/hooks";
import _ from "lodash";
type Props = {
  setIsReset?: (value: boolean) => void;
  setFormActive: (value: boolean) => void;
};
const BlogFormInitializer = ({ setFormActive, setIsReset }: Props) => {
  const { reset, setValue, getValues } = useFormContext<BlogRequest>();
  const blogForm = useAppSelector((state) => state.blogForm.form);
  const [initialized, setInitialized] = useState(false);
  // const initializedRef = useRef(false);
  useEffect(() => {
    // console.log("initdata", blogForm && !initializedRef.current && reset);
    console.log("reset", !!reset);
    console.log("initialized", initialized);
    console.log("blogForm", blogForm);

    if (blogForm && !initialized && reset) {
      setTimeout(() => {
        reset(blogForm);
        setValue("content", blogForm.content);
        setIsReset?.(true);

        setFormActive(true);
        setInitialized(true);
        // initializedRef.current = true;
      });
      //   // const parsed = blogRequestSchema.parse(blogForm)
      //   // reset(structuredClone(parsed) as BlogRequest)
      //   // console.log("blog form init", blogForm);
      //   // reset(blogForm)
    }
  }, [blogForm, reset, setFormActive, setIsReset, initialized]);

  return null;
};

export default BlogFormInitializer;
