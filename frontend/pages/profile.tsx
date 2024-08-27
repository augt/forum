import { StyledButton } from "@/components/atoms/Button/index.style";
import { ConnectedUserContext } from "@/components/Context";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import EditProfileForm from "@/components/molecules/EditProfileForm";

export default function Profile() {
  return (
    <main>
      <EditProfileForm />
    </main>
  );
}
