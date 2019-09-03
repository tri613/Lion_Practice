import React, { Component } from 'react';
import bannerImg from './imgs/banner.png';
import Button from './Button';
import { setTimeout } from 'timers';

class Banner extends Component {
    static defaultProps = {
        openAtStart: true,
        autoToggle: 3000,
        button:
        {
            closeText: '收合',
            openText: '展開',
            class: 'btn',
        },
        class: {
            closed: 'closed',
            closing: 'closing',
            opened: 'opened',
            opening: 'opening'
        },
        whenTransition:
            function () {
                console.log('whenTransition');
            },
        transition: true
    }
    myTimer = '';
    state = {
        transTime: 600,
        bannerStat: this.props.openAtStart && this.props.autoToggle ? 0 : 2
    };
    bannerClasses = [this.props.class.opened, this.props.class.closing, this.props.class.closed, this.props.class.opening];
    autoToggle = () => {
        if (typeof this.props.autoToggle === 'number') {
            setTimeout(this.toggleBanner, this.props.autoToggle);
        }
    }
    toggleBanner = () => {
        if (this.props.transition) {
            if (this.state.bannerStat === 0 || this.state.bannerStat === 2) {
                this.setState({ bannerStat: this.state.bannerStat + 1 });
                this.myTimer = setInterval(() => {
                    this.props.whenTransition()
                }, this.state.transTime / 31);
                setTimeout(() => {
                    this.clearTimer(this.myTimer);
                    if (this.state.bannerStat < 3) {
                        this.setState({ bannerStat: this.state.bannerStat + 1 });
                    } else { this.setState({ bannerStat: 0 }); }
                }, this.state.transTime);
            }
        } else {
            if (this.state.bannerStat === 0) {
                this.setState({ bannerStat: 2 })
            } else {
                this.setState({ bannerStat: 0 })
            }
        }
    }
    clearTimer = (timer) => {
        console.log(this.myTimer)
        clearInterval(timer);
        clearTimeout(timer);
    }
    componentDidMount() {
        this.autoToggle();
    }
    render() {
        const { bannerStat } = this.state;
        let fullClassName = this.props.transition ? 'banner transition ' : 'banner ';

        switch (this.state.bannerStat) {
            case 0:
                fullClassName = fullClassName + this.bannerClasses[0]
                break;
            case 1:
                fullClassName = fullClassName + this.bannerClasses[1]
                break;
            case 2:
                fullClassName = fullClassName + this.bannerClasses[2]
                break;
            case 3:
                fullClassName = fullClassName + this.bannerClasses[3]
                break;
            default:
                break;
        }
        return (
            <div className={fullClassName}>
                <a className="wrap" href='https://www.plurk.com/portal/'>
                    <img className="img" src={bannerImg} title="輸入廣告促銷說明文字" alt="輸入廣告促銷說明文字" />
                </a>
                <Button
                    btnName={this.props.button.class}
                    toggle={this.toggleBanner}
                    btnText={bannerStat === 0 || bannerStat === 3 ? this.props.button.closeText : this.props.button.openText}></Button>
            </div>
        );
    }
}
export default Banner;