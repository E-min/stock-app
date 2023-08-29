import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
import { useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const BrandsCard = ({ firmInfos = {}, handleOpen }) => {
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    const imgElement = new Image();
    imgElement.src = firmInfos.image;
    imgElement.onload = () => {
      setImgLoading(false);
    };
    imgElement.onerror = () => {
      setImgLoading(false);
    };
  }, [firmInfos.image]);

  return (
    <Card
      sx={{
        width: 250,
        p: '0 1rem 1rem 1rem',
        textAlign: "center",
      }}
    >
      <h2>{firmInfos.name}</h2>
      {imgLoading ? (
        <Skeleton variant={"rounded"} width={"100%"} height={120} />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            src={firmInfos.image}
            alt="firm logo"
          />
        </Box>
      )}
      {Object.keys(firmInfos).includes("phone", "address") && (
        <>
          <p style={{ height: "70px" }}>{firmInfos.address}</p>
          <p style={{ height: "1.5rem" }}>{firmInfos.phone}</p>
        </>
      )}
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => handleOpen(firmInfos, "put")}
        color="primary"
      >
        <Edit fontSize="medium" />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => handleOpen(firmInfos, "delete")}
        color="error"
      >
        <Delete fontSize="medium" />
      </IconButton>
    </Card>
  );
};
export default BrandsCard;
