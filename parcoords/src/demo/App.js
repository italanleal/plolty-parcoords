/* eslint no-magic-numbers: 0 */

import { Parallel } from '../lib';

class App extends Component {
    constructor(){
        super();
        this.state = {}
        this.setProps = this.setProps.bind(this);
        this.mutateData = this.mutateData.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        const {data} = this.state;
        
        return (
                <Parallel setProps={this.setProps} {...this.state} />
        )
    }
};

export default App;
