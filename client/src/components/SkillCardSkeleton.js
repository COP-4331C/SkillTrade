import Skeleton from "@mui/material/Skeleton";
import * as React from "react";



export default function SkillCardSkeleton() {

  return (
    <Skeleton
      variant="rectangular"
      width="350px"
      height={550}
      sx={{
        bgcolor: "grey.400",
        border: "1px solid",
        borderRadius: 5,
        borderColor: "grey.400"
      }}
    />
  );
}