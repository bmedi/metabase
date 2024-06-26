/* eslint-disable react/prop-types */
import { Component } from "react";
import { t } from "ttag";

import ModalContent from "metabase/components/ModalContent";
import Button from "metabase/core/components/Button";
import { FormMessage } from "metabase/forms";

class ArchiveModal extends Component {
  state = {
    error: null,
  };

  archive = async () => {
    const { onArchive, onClose } = this.props;
    try {
      await onArchive();
      // Note - if using this component inside of a modal route, make sure onClose is called in that component and not here, otherwise any attmempts to push to a new location won't work properly
      // Currently the only place we don't use this in a modal route is archiving a question
      if (onClose) {
        onClose();
      }
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { title, message, onClose } = this.props;
    const { error } = this.state;
    return (
      <ModalContent
        title={title || t`Archive this?`}
        footer={[
          error ? <FormMessage key="message" formError={error} /> : null,
          <Button key="cancel" onClick={onClose}>
            {t`Cancel`}
          </Button>,
          <Button key="archive" warning onClick={this.archive}>
            {t`Archive`}
          </Button>,
        ]}
      >
        {message}
      </ModalContent>
    );
  }
}

export default ArchiveModal;
