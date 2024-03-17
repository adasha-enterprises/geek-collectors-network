// TODO: Extract to separate file
type Friend = {
    id: string,
    firstName: string,
    lastName: string,
    image: string,
  }

  type User = {
    id: string,
    firstName: string,
    lastName: string,
    image: string,
  }

type ModalProps = {
    onClose: () => void;
    isOpen: boolean;
    headerContent: React.ReactNode;
    bodyContent: React.ReactNode;
    footerContent: React.ReactNode;
}

type FriendRequestHeaderProps = {
  userName: string;
}

export type { Friend };
export type { User };
export type { ModalProps };
export type { FriendRequestHeaderProps };
