# Security Policy

This document outlines how to report vulnerabilities in **apps-script-utils**. We appreciate the efforts of security researchers
to help us keep the utility library secure.

## Supported Versions

We aim to provide security updates for the following versions of **apps-script-utils** on a best-effort basis:

<table width="100%">
  <thead>
    <tr>
      <th align="left">Version</th>
      <th align="left">Supported</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>>= 1.0.0</code></td>
      <td>:white_check_mark:</td>
    </tr>
    <tr>
      <td><code>< 1.0.0</code></td>
      <td>:x:</td>
    </tr>
  </tbody>
</table>

We recommend using the latest stable version to benefit from any security improvements.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a potential security vulnerability, please report it privately.

1. **Send an Email:** Send a report
   to [stoianov.maksym+apps-script-utils+security@gmail.com](mailto:stoianov.maksym+apps-script-utils+security@gmail.com).
2. **Include Details:** To help us understand the issue, please include:
   - A descriptive title.
   - Type of issue.
   - Affected versions.
   - Step-by-step instructions to reproduce or a proof-of-concept.
3. **Wait for Response:** We will try to acknowledge your report as soon as possible, depending on our availability.

## Our Security Process

When a vulnerability is reported, we will:

1. **Review:** Evaluate the report to determine if it is a valid security concern.
2. **Development:** If confirmed, we will work on a fix as our resources and time permit.
3. **Disclosure:** Once a fix is released, we may provide credit to the reporter (if they wish) and may publish a
   security advisory.

## Disclosure Policy

- We follow the principle of coordinated vulnerability disclosure.
- We ask that you give us a reasonable amount of time to resolve the issue before making any information public.

## Recognition

We value the work of security researchers and may credit those who report vulnerabilities in our release notes or
security advisories at our discretion.

## Security Best Practices for Users

To help keep your applications secure, we recommend following these general best practices:

1. **Keep Dependencies Updated:** Regularly update your project dependencies.
2. **Secret Management:** Never commit sensitive information (API keys, secrets) to your repository. Use environment
   variables.
3. **Principle of Least Privilege:** Grant only necessary permissions in your `appsscript.json`.
4. **Input Validation:** Always validate and sanitize user input.

---

_Thank you for helping us keep **apps-script-utils** secure!_
