import React, {Component} from 'react';
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import {getSecretData} from "../actions";


class Secret extends Component {

    static async getInitialProps({req}) {
        const pageText = 'Here is the secret ....';
        const secretData = await getSecretData(req);
        return {pageText, secretData};
    }

    state = {
        secretData: []
    }

    async componentDidMount() {
        const secretData = await getSecretData();
        this.setState({secretData})
    }

    displaySecretData() {
        const {secretData} = this.state;

        if (secretData && secretData.length > 0) {
            return secretData.map((data, index) => {
                return (
                    <div key={index}>
                        <p>{data.title}</p>
                        <p>{data.description}</p>
                    </div>
                )
            })
        }
    }

    render() {
        const {pageText} = this.props;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage>
                    <h1>Secret Page</h1>
                    <h2>{pageText}</h2>
                    {this.displaySecretData()}
                </BasePage>
            </BaseLayout>
        )
    }
}

export default withAuth('siteOwner')(Secret);