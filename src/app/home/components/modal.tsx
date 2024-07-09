import React, { useState } from 'react';
import { Modal, FloatButton, Flex } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

type Settings = {
    randomAlgo: boolean;
}
export var settings: Settings = {
    randomAlgo: false,
}

const onAlgoSwitchChange = (checked: boolean) => {
    settings.randomAlgo = checked;
};

type Props = {}
export const SettingsModal = (props: Props) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    return (
        <>
            <FloatButton type='primary' icon={<SettingOutlined />} onClick={showModal} />
            <Modal title="Feature Settings (Release Soon)" open={open} onOk={hideModal} onCancel={hideModal}>
                <p>Allow host to configure feature settings</p>
                <hr />
                <p>Examples:</p>
                <Flex justify='space-between' align='center'>
                    <p>Random Algorithm (off: v1 / on: v2): </p>
                    <Switch onChange={onAlgoSwitchChange} />
                </Flex>
            </Modal>
        </>
    );
};

// export default SettingsModal;