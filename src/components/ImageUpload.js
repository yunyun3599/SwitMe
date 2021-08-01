import React, { useState } from "react";
import styled from "styled-components";

const UploadButton = styled.button`
  font-weight: bold;
  font-size: 1rem;
  color: white;
  background-color: var(--middle);
  outline: none;
  border: none;
`;

const uploadImage = () => {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.click();
  input.onchange = function (e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = function () {
      console.log(reader.result);
      var answer = reader.result;
    };
  };
};

const ImageUpload = ({ name, width, height, radius, ...rest }) => {
  return (
    <UploadButton
      onClick={uploadImage}
      style={{ width: width, height: height, borderRadius: radius }}
      {...rest}
    >
      {name}
    </UploadButton>
  );
};

// const ImagePreview = ({ width, height, radius, ...rest }) => {
//   return (
//     <>
//       {uploadImage.answer !== null ? (
//         <Image
//           alt="profile"
//           src={require("../assets/profile.png").default}
//           width="124"
//           height="124"
//         />
//       ) : (
//         <Image
//           alt="profile"
//           src={uploadImage.answer}
//           width="124"
//           height="124"
//         />
//       )}
//     </>
//   );
// };

export default ImageUpload;
