import React from 'react';
import { Container, Typography, Divider } from '@material-ui/core';
import MyBox from 'components/MyBox';

export const PageHome = () => {
    return (
        <MyBox p={1}>
            <Container>
                <Typography align="center" variant="h5">
                    Gmail Contacts Extension1
                </Typography>
                <Divider variant="fullWidth" />
                <Typography align="center" variant="h6">
                    Please use Gmail Contacts Extension
                </Typography>
            </Container>
        </MyBox>
    );
};

export default PageHome;
