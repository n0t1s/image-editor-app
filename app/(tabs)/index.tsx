import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageEdit, ImageSelect } from "../../components";

export default function MainScreen() {
  const [image, setImage] = useState<string | undefined>();
  const [imageEdit, setImageEdit] = useState(false);

  return (
    <SafeAreaView>
      {!imageEdit ? (
        <ImageSelect
          image={image}
          setImage={setImage}
          setImageEdit={setImageEdit}
        />
      ) : (
        <ImageEdit
          image={image}
          setImage={setImage}
          setImageEdit={setImageEdit}
        />
      )}
    </SafeAreaView>
  );
}
