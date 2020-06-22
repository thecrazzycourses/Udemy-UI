import React, {Component} from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from '../components/hoc/withAuth';

class Cv extends Component {
    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage title="CV Page">
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(Cv);