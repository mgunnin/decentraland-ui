import * as React from 'react'
import { Network } from '@dcl/schemas'
import { Button } from '../Button/Button'
import './Network.css'

export enum NetworkGatewayType {
  MOON_PAY = 'moonPay',
  TRANSAK = 'transak'
}

export type NetworksNames = {
  [key in Network]: string
}

export type GatewaysNames = {
  [key in NetworkGatewayType]: string
}

export const networksNames: NetworksNames = {
  [Network.ETHEREUM]: 'Ethereum',
  [Network.MATIC]: 'Polygon'
}

export const gatewaysNames: GatewaysNames = {
  [NetworkGatewayType.MOON_PAY]: 'MoonPay',
  [NetworkGatewayType.TRANSAK]: 'Transak'
}

export type BuyWithFiatNetworkProps = {
  className?: string
  message?: React.ReactNode
  hasError?: boolean
  open?: boolean
  loading?: boolean
  i18n?: NetworkI18N
  type: Network
  gateways: Omit<NetworkGatewayProps, 'network'>[]
  onClose?: () => void
  onInfo?: () => void
  onBack?: () => void
}

export type NetworkGatewayProps = {
  type: NetworkGatewayType
  network: Network
  learnMoreLink?: string
  i18n?: NetworkGatewayI18N
  disabled?: boolean
  onContinue: () => void
}

export type NetworkI18N = {
  title: React.ReactNode
  error: React.ReactNode
}

export type NetworkGatewayI18N = {
  title: React.ReactNode
  subtitle: React.ReactNode
  continueButtonText: React.ReactNode
  learnMoreText: React.ReactNode
}

class ButWithFiatNetworkGateway extends React.PureComponent<NetworkGatewayProps> {
  render(): JSX.Element {
    const {
      type,
      network,
      i18n,
      learnMoreLink,
      disabled = false,
      onContinue
    } = this.props

    const title: React.ReactNode = `Buy ${networksNames[network]} MANA with ${gatewaysNames[type]}`
    const subtitle: React.ReactNode =
      'You can buy with debit and credit cards, Apple Pay, Google Pay, or via bank transfer.'
    const continueButtonText: React.ReactNode = `Continue with ${gatewaysNames[type]}`
    const learnMoreText: React.ReactNode = `Learn More about ${gatewaysNames[type]}`

    return (
      <div
        className={`dcl gateway ${type} ${disabled ? 'disabled' : ''}`.trim()}
      >
        <div className="image" />
        <div className="info">
          <div className="diseableable-container">
            <div className="title">{i18n?.title || title}</div>
            <div className="subtitle">{i18n?.subtitle || subtitle}</div>
            <Button
              inverted
              onClick={onContinue}
              className={'continue-button'}
              disabled={disabled}
            >
              {i18n?.continueButtonText || continueButtonText}
            </Button>
          </div>
          <a
            className="learn-more"
            href={learnMoreLink}
            target="_blank"
            rel="external"
          >
            {i18n?.learnMoreText || learnMoreText}
          </a>
        </div>
      </div>
    )
  }
}

export class BuyWithFiatNetwork extends React.Component<BuyWithFiatNetworkProps> {
  static Gateway = ButWithFiatNetworkGateway

  enabledFirst(
    { disabled: disabledA = false },
    { disabled: disabledB = false }
  ): number {
    return Number(disabledA) - Number(disabledB)
  }

  render(): JSX.Element {
    const { type, gateways } = this.props

    return (
      <div className="gateways-container">
        {gateways.sort(this.enabledFirst).map((gatewayProps) => (
          <ButWithFiatNetworkGateway {...gatewayProps} network={type} />
        ))}
      </div>
    )
  }
}
